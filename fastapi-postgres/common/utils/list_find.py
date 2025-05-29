from functools import reduce


def list_obj_to_obj(collection, value, key, default=None):
    try:
        if collection and type(collection[0]) == dict:
            return next((_ for _ in collection if _.get(key) == value), default)
        return next((_ for _ in collection if getattr(_, key) == value), default)
    except:
        return default


def list_obj_to_list_value_by_key(collection, key):
    try:
        if collection and type(collection[0]) == dict:
            return [_.get(key) for _ in collection]

        return [getattr(_, key) for _ in collection]
    except:
        pass
    return [_ for _ in collection]


def group_list_obj_by_key(my_list, key) -> dict:
    def reduceFromTuplePair(obj1, obj2):
        if not isinstance(obj1, dict):
            return reduce(reduceFromTuplePair, [{}, obj1, obj2])
        try:
            val = getattr(obj2, key)
        except Exception:
            val = obj2.get(key)
        try:
            obj1[val].append(obj2)
        except Exception:
            obj1[val] = [obj2]

        return obj1

    ans = reduce(reduceFromTuplePair, my_list, {})
    return ans
